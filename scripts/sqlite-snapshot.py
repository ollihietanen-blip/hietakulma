#!/usr/bin/env python3
"""Consistent SQLite backup/restore into a NEW file; never overwrites a live database."""
import argparse
import json
import os
from pathlib import Path
import sqlite3


def snapshot(source, destination):
    source, destination = Path(source), Path(destination)
    if not source.is_absolute() or not destination.is_absolute():
        raise ValueError('Source and destination must be absolute paths.')
    source = source.resolve(strict=True)
    if not source.is_file():
        raise ValueError('Source must be an existing database file.')
    # SQLite backup includes committed WAL contents; an ordinary file copy may not.
    with sqlite3.connect(source.as_uri() + '?mode=ro', uri=True) as src:
        if src.execute('PRAGMA integrity_check').fetchall() != [('ok',)]:
            raise ValueError('Source integrity check failed.')
        fd = os.open(destination, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        os.close(fd)
        try:
            with sqlite3.connect(destination) as dest:
                src.backup(dest)
                if dest.execute('PRAGMA integrity_check').fetchall() != [('ok',)]:
                    raise ValueError('Destination integrity check failed.')
                if dest.execute('PRAGMA foreign_key_check').fetchall():
                    raise ValueError('Destination foreign key check failed.')
            return {'source': str(source), 'destination': str(destination), 'integrity': 'ok'}
        except Exception:
            destination.unlink(missing_ok=True)
            raise


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True)
    parser.add_argument('--destination', required=True)
    args = parser.parse_args()
    try:
        print(json.dumps(snapshot(args.source, args.destination)))
    except (ValueError, OSError, sqlite3.Error) as error:
        parser.exit(1, f'{error}\n')
