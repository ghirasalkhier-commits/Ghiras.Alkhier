import os

public_dir = r'c:\Users\zim zim\OneDrive\Desktop\Ghiras Alkhier\public'
profile_link = """    <a href="profile.html" class="flex flex-col items-center gap-1 text-gray-500 hover:text-[#135c38] transition-colors">
        <span class="material-symbols-outlined text-[24px]">person</span>
        <span class="text-[10px] font-medium tracking-wide">Profile</span>
    </a>
"""

for filename in os.listdir(public_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(public_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Don't add if already exists
        if 'href="profile.html"' in content and 'Profile' in content:
            continue
            
        # Find </nav> and insert before it
        if '</nav>' in content:
            content = content.replace('</nav>', profile_link + '</nav>')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {filename}')
