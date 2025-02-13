<script lang="ts">
  import { notifications } from "$lib/notifications";
  import { fade } from "svelte/transition"; 
</script>

{#if $notifications.length > 0}
  <div class="notification-container">
    {#each $notifications as { message, type, id }}
      <div class="notification {type}" transition:fade>
        {#if type === 'success' || type === 'info'}
          <div class="icon-container">
            <span class="icon success">&#10003;</span>
            <span>{message}</span>
          </div>
        {:else if type === 'error' || type === 'warning'}
          <div class="icon-container">
            <span class="icon error">&#10060;</span>
            <span>{message}</span>
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style>
  .notification-container {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    max-width: 250px;
    width: 100%;
    padding: 0 10px;
  }

  .notification {
    background-color: #333; 
    color: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .notification.success {
    background-color: #2E2E2E;
  }

  .notification.error {
    background-color: #2E2E2E;
  }

  .notification.info {
    background-color: #2E2E2E;
  }

  .notification.warning {
    background-color: #2E2E2E;
  }

  .icon-container {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon.success {
    background-color: #4caf50;
    color: white;
  }

  .icon.error {
    background-color: #f44336;
    color: white;
  }

</style>
