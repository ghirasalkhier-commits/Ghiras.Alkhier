import os
import glob
import re

public_dir = r'c:\Users\zim zim\OneDrive\Desktop\Ghiras Alkhier\public'

files = glob.glob(os.path.join(public_dir, '*.html')) + glob.glob(os.path.join(public_dir, '*.js'))

pattern = re.compile(r'^[ \t]*if[ \t]*\(!res\.ok\)[ \t]*\{[ \t]*console\.error\(.*?\);[ \t]*return;[ \t]*\}\n?', re.MULTILINE)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = pattern.sub('', content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed silent return from {os.path.basename(file)}")

print("Done removing silent returns.")
