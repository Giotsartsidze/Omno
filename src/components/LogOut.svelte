<script lang="ts">
    function logout() {
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/';
    }
  </script>
  
  <button on:click={logout}>Logout</button>
  