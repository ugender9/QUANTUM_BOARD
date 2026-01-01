const API_BASE = 'http://127.0.0.1:5000';
let currentUser = null;
let currentRole = null;

// Valid Faculty IDs (Admin can change these)
const validFacultyIds = ['FAC001', 'FAC002', 'FAC003', 'FAC004', 'FAC005'];

const db = firebase.firestore();
const storage = firebase.storage();

function toggleForm() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('signupForm').classList.toggle('hidden');
}

// Show/Hide Faculty ID field based on role selection
function toggleFacultyIdField() {
    const role = document.getElementById('signupRole').value;
    const facultyIdField = document.getElementById('facultyId');

    if (role === 'faculty') {
        facultyIdField.style.display = 'block';
        facultyIdField.required = true;
    } else {
        facultyIdField.style.display = 'none';
        facultyIdField.required = false;
        facultyIdField.value = '';
    }
}

async function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;
    const facultyId = document.getElementById('facultyId').value;

    if (!name || !email || !password) {
        alert('Fill all fields');
        return;
    }

    // Verify Faculty ID if registering as Faculty
    if (role === 'faculty') {
        if (!facultyId) {
            alert('Faculty ID is required');
            return;
        }

        if (!validFacultyIds.includes(facultyId)) {
            alert('Invalid Faculty ID. Please contact your administrator.');
            return;
        }
    }

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            role: role,
            facultyId: role === 'faculty' ? facultyId : null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'online'
        });

        alert('Signup successful!');
        currentUser = user;
        currentRole = role;
        showApp();
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const selectedRole = document.getElementById('loginRole').value;

    if (!email || !password) {
        alert('Fill all fields');
        return;
    }

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Get actual role from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();

        if (!userDoc.exists) {
            alert('User data not found');
            return;
        }

        const actualRole = userDoc.data().role;

        // Check if selected role matches stored role
        if (selectedRole !== actualRole) {
            await firebase.auth().signOut();
            alert(`You signed up as ${actualRole}, not ${selectedRole}`);
            return;
        }

        // Update last login
        await db.collection('users').doc(user.uid).update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'online'
        });

        currentUser = user;
        currentRole = actualRole;
        showApp();
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function logout() {
    try {
        await db.collection('users').doc(currentUser.uid).update({
            status: 'offline',
            lastLogout: firebase.firestore.FieldValue.serverTimestamp()
        });
        await firebase.auth().signOut();
        currentUser = null;
        currentRole = null;
        showAuth();
        alert('Logged out successfully');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function showAuth() {
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('appContainer').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
}

function showApp() {
    document.getElementById('authContainer').classList.add('hidden');
    document.getElementById('appContainer').classList.remove('hidden');
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('userRole').textContent = `(${currentRole})`;

    if (currentRole === 'faculty') {
        document.getElementById('facultyPanel').classList.remove('hidden');
    } else {
        document.getElementById('facultyPanel').classList.add('hidden');
    }

    loadNotices();
}

async function postNotice() {
    const title = document.getElementById('noticeTitle').value;
    const content = document.getElementById('noticeContent').value;
    const isEvent = document.getElementById('isEvent').checked;

    if (!title || !content) {
        alert('Fill all fields');
        return;
    }

    document.getElementById('loadingIndicator').classList.remove('hidden');

    try {
        const res = await fetch(`${API_BASE}/api/notices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, userId: currentUser.uid })
        });

        const data = await res.json();

        if (data.success) {
            const analysis = data.analysis;

            document.getElementById('analysisCategory').textContent = analysis.category;
            document.getElementById('analysisImportance').textContent = analysis.importance;
            document.getElementById('analysisTags').textContent = analysis.tags.join(', ');
            document.getElementById('analysisResult').classList.remove('hidden');

            await db.collection('notices').add({
                title: title,
                content: content,
                isEvent: isEvent,
                category: analysis.category,
                importance: analysis.importance,
                tags: analysis.tags,
                createdBy: currentUser.uid,
                createdByEmail: currentUser.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert('Notice posted successfully!');
            document.getElementById('noticeTitle').value = '';
            document.getElementById('noticeContent').value = '';
            document.getElementById('isEvent').checked = false;
            document.getElementById('analysisResult').classList.add('hidden');

            loadNotices();
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error posting notice: ' + error.message);
    } finally {
        document.getElementById('loadingIndicator').classList.add('hidden');
    }
}

function loadNotices() {
    db.collection('notices')
        .orderBy('timestamp', 'desc')
        .onSnapshot((querySnapshot) => {
            const noticesList = document.getElementById('noticesList');
            noticesList.innerHTML = '';

            if (querySnapshot.empty) {
                noticesList.innerHTML = '<p>No notices yet</p>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const notice = doc.data();
                const card = document.createElement('div');
                card.className = 'notice-card';

                const date = notice.timestamp?.toDate();
                const dateStr = date ? date.toLocaleDateString() : 'Unknown';

                const importanceBadge = `<span class="notice-badge ${notice.importance}">${notice.importance}</span>`;
                const tagsHTML = notice.tags.map(tag => `<span class="notice-badge">${tag}</span>`).join('');

                card.innerHTML = `
                    <h3>${notice.title}</h3>
                    <p>${notice.content}</p>
                    <div>
                        <span class="notice-badge">${notice.category}</span>
                        ${importanceBadge}
                        ${tagsHTML}
                    </div>
                    <div class="notice-meta">
                        <p>Posted by: ${notice.createdByEmail}</p>
                        <p>Date: ${dateStr}</p>
                    </div>
                `;

                noticesList.appendChild(card);
            });
        }, (error) => {
            console.error('Error loading notices:', error);
            document.getElementById('noticesList').innerHTML = '<p>Error loading notices</p>';
        });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        db.collection('users').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                currentRole = doc.data().role;
                showApp();
            }
        });
    } else {
        showAuth();
    }
});
