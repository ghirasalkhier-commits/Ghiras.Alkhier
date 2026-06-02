import os
import re

# 1. Update loader.js to force login
loader_path = r'c:\Users\zim zim\OneDrive\Desktop\Ghiras Alkhier\public\loader.js'
with open(loader_path, 'r', encoding='utf-8') as f:
    loader_content = f.read()

force_login_script = """
// Force Login Check
(function() {
    var currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) currentPage = 'index.html'; // root path
    if (currentPage !== 'login.html') {
        if (!localStorage.getItem('token')) {
            window.location.href = 'login.html';
        }
    }
})();
"""

if "Force Login Check" not in loader_content:
    loader_content = force_login_script + "\n" + loader_content
    with open(loader_path, 'w', encoding='utf-8') as f:
        f.write(loader_content)
    print("Updated loader.js with force login check")

# 2. Update server.js to extend session expiration to 365 days
server_path = r'c:\Users\zim zim\OneDrive\Desktop\Ghiras Alkhier\server.js'
with open(server_path, 'r', encoding='utf-8') as f:
    server_content = f.read()

# Replace '7d' or '24h' with '365d' in jwt.sign
server_content = re.sub(r"expiresIn:\s*'7d'", "expiresIn: '365d'", server_content)
server_content = re.sub(r"expiresIn:\s*'24h'", "expiresIn: '365d'", server_content)

with open(server_path, 'w', encoding='utf-8') as f:
    f.write(server_content)
print("Updated server.js to 365d session duration")

# 3. Check if index.html has // Authentication removed for static site and optionally remove it. (not strictly necessary but cleaner)
index_path = r'c:\Users\zim zim\OneDrive\Desktop\Ghiras Alkhier\public\index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    index_content = f.read()

if "Authentication removed for static site" in index_content:
    index_content = index_content.replace("// Authentication removed for static site", "// Authentication is now handled by loader.js")
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)
    print("Updated index.html comments")
