import os

loader_path = r'c:\Users\zim zim\OneDrive\Desktop\Ghiras Alkhier\public\loader.js'
with open(loader_path, 'r', encoding='utf-8') as f:
    loader_content = f.read()

# Fix the interceptor so it doesn't trigger on auth routes
old_interceptor = "if (response.status === 401 && url.includes('/api/')) {"
new_interceptor = "if (response.status === 401 && url.includes('/api/') && !url.includes('/api/auth/')) {"

if old_interceptor in loader_content:
    loader_content = loader_content.replace(old_interceptor, new_interceptor)
    
# Also add a check so logged-in users who go to login.html are redirected to index.html
if "if (currentPage === 'login.html') {" not in loader_content:
    injection = """    if (currentPage === 'login.html') {
        if (localStorage.getItem('token')) {
            window.location.href = 'index.html';
        }
    }
"""
    loader_content = loader_content.replace("if (currentPage !== 'login.html') {", injection + "    if (currentPage !== 'login.html') {")

with open(loader_path, 'w', encoding='utf-8') as f:
    f.write(loader_content)
    
print("Fixed loader.js")
