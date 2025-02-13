<script lang="ts">
  export let onLogin: () => void;

  let username: string = '';
  let password: string = '';
  let errorMessage: string = '';

  function handleLogin() {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();  // Trigger the parent login function
    } else {
      errorMessage = 'Invalid username or password';
    }
  }
</script>

<div class="login-container">
  <h2>Login</h2>
  <form on:submit|preventDefault={handleLogin}>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" bind:value={username} required />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" bind:value={password} required />
    </div>
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
    <button type="submit">Login</button>
  </form>
</div>

<div class="credentales">
  <h2>Username : admin</h2>
<h3>Password : password</h3>

</div>
<style>
  .login-container {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
  }

  button {
    padding: 10px;
    width: 100%;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
  }

  .error {
    color: red;
    font-size: 12px;
  }
  .credentales {
    text-align: center;
  }
</style>
