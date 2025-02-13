<script lang="ts">
    function logout() {
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/'; // Redirect to login page after logout
    }
  </script>
  
  <button on:click={logout}>Logout</button>
  