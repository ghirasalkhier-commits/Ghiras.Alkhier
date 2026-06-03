import os

filepath = r'c:\Users\zim zim\OneDrive\Desktop\Ghiras Alkhier\public\edit-profile.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the silent return with proper error handling and toast
old_line = "if (!response.ok) { console.error(result); return; }"
new_line = """
                if (!response.ok) {
                    console.error(result);
                    const errorElement = document.getElementById('edit-error');
                    errorElement.textContent = result.error || "Server error while saving.";
                    errorElement.classList.remove('hidden');
                    return;
                }
"""

if old_line in content:
    content = content.replace(old_line, new_line)

# Also ensure that even if the API fails, it updates localStorage so it works offline/temporarily
# Wait, localStorage update is already happening BEFORE the fetch!
# But what if there's an exception during JSON parsing of result?
# Let's wrap the JSON parsing in a try/catch.
old_try_block = """
                const response = await fetch(`/api/profile/${originalEmail}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        phone: currentUser.phone,
                        gender: currentUser.gender,
                        profilePicture: currentUser.profilePicture
                    })
                });
                const result = await response.json();
                if (!response.ok) {
                    console.error(result);
                    const errorElement = document.getElementById('edit-error');
                    errorElement.textContent = result.error || "Server error while saving.";
                    errorElement.classList.remove('hidden');
                    return;
                }
                console.log('Server response:', result);
"""

# Let's just use regex or simple replacement to make the whole try-catch block robust.

robust_code = """
            try {
                const response = await fetch(`/api/profile/${originalEmail}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        phone: currentUser.phone,
                        gender: currentUser.gender,
                        profilePicture: currentUser.profilePicture
                    })
                });
                
                let result = {};
                try {
                    result = await response.json();
                } catch(e) {
                    console.error('Non-JSON response', e);
                }

                if (!response.ok) {
                    const errorElement = document.getElementById('edit-error');
                    errorElement.textContent = result.error || "Server error while saving.";
                    errorElement.classList.remove('hidden');
                    // We shouldn't return, we can just proceed locally if we want, but let's return for correctness.
                    return;
                }

                const passwordInput = document.getElementById('edit-password');
                if (passwordInput && !document.getElementById('set-password-container').classList.contains('hidden')) {
                    const passVal = passwordInput.value.trim();
                    if (passVal.length >= 6) {
                        await fetch(`/api/profile/${originalEmail}/password`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ password: passVal })
                        });
                    }
                }
            } catch (e) {
                console.error("Error saving to server", e);
                const errorElement = document.getElementById('edit-error');
                errorElement.textContent = "Network error while saving.";
                errorElement.classList.remove('hidden');
                return;
            }
"""

import re
content = re.sub(r'try\s*\{\s*console\.log\(\'Saving to server.*?\}\s*catch\s*\(e\)\s*\{\s*console\.error\("Error saving to server",\s*e\);\s*\}', robust_code, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated edit-profile.html")
