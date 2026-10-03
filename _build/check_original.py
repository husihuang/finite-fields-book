from pathlib import Path
import sys
sys.path.insert(0,str(Path(__file__).resolve().parent))
from inspect_chapters import parse
keys={'p071-l02','p084-l04','p095-l03','p095-l04','p114-l04','p114-l05','p114-l06','p114-l07','p123-l04'}
for path in sorted(Path('_build/revision-backup/chapters').glob('c*.md')):
    for u in parse(path)['units']:
        if u['id'] in keys:print(u['id'],repr(u['text']))
