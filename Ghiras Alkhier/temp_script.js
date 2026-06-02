
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Access Denied: Admins Only');
            window.location.href = 'index.html';
        }
    