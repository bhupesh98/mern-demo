export async function signUp(userData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include', // Allow credentials
    });
    return (await response.json());
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function signIn(credentials) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include', // Allow credentials
    });
    if (!response.ok) {
      throw new Error('Failed to sign in');
    }
    return (await response.json()).data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const response = await fetch('/api/auth/signout', {
      credentials: 'include', // Allow credentials
    });
    if (!response.ok) {
      throw new Error('Failed to sign out');
    }
    return await response.json();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const response = await fetch('/api/users', {
      credentials: 'include', // Allow credentials
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return (await response.json()).data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getUserById(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      credentials: 'include', // Allow credentials
    });
    return (await response.json());
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export async function updateUser(userId, updatedData) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
      credentials: 'include', // Allow credentials
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return (await response.json()).data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include', // Allow credentials
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
