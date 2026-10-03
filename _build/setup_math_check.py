from pathlib import Path
import urllib.request,zipfile,tarfile
base=Path('_build/.tools')
node=base/'node-v22.14.0-win-x64/node.exe'
if not node.exists():
    archive=base/'node-v22.14.0-win-x64.zip'
    urllib.request.urlretrieve('https://nodejs.org/dist/v22.14.0/node-v22.14.0-win-x64.zip',archive)
    with zipfile.ZipFile(archive) as z:z.extractall(base)
    print('Node downloaded from nodejs.org',flush=True)
package=base/'mathjax-full'
if not package.exists():
    archive=base/'mathjax-full-3.2.2.tgz'
    urllib.request.urlretrieve('https://registry.npmjs.org/mathjax-full/-/mathjax-full-3.2.2.tgz',archive)
    with tarfile.open(archive) as t:
        for member in t.getmembers():
            assert member.name.startswith('package/') and '..' not in Path(member.name).parts
        t.extractall(base/'mathjax-tar',filter='data')
    (base/'mathjax-tar/package').rename(package)
    print('MathJax downloaded from npm registry',flush=True)
