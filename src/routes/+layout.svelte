<script lang="ts">
    import Login from "../components/login.svelte";
    import "../styles/global.css";

  import SideMenu from "../components/SideMenu.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import AddWebhook from "../components/AddWebhook.svelte";
  import WebhookModal from "../components/WebhookModal.svelte";

  let isLoggedIn = false;
  let showModal = false;
  let selectedWebhook: null = null;

  function closeModal() {
    showModal = false;
    selectedWebhook = null;
  }
  onMount(() => {
    isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  });

  function handleLogin() {
    localStorage.setItem("isLoggedIn", "true");
    isLoggedIn = true;
  }

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    isLoggedIn = false;
  }


  function openModal(event: CustomEvent) {
    selectedWebhook = event.detail.webhook;
    showModal = true;
  }
</script>

<div class="container">
  {#if !isLoggedIn}
    <Login onLogin={handleLogin} />
  {:else}
    <SideMenu />
    <nav>
      <div class="left">
        <h2>Webhooks</h2>
        <a href="/" class:active={$page.url.pathname === "/"}>Configuration</a>
        <a href="/statuses" class:active={$page.url.pathname === "/statuses"}
          >Statuses</a
        >
      </div>
      <AddWebhook on:open={openModal} />
    </nav>

    <hr />
    <WebhookModal {showModal} webhook={selectedWebhook} on:close={closeModal} />

    <slot />

    <button class="logout" on:click={handleLogout}>Logout</button>
  {/if}
</div>

<style>
  .container {
    padding-left: calc(144px - 60px);
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }

  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 350px;
  }

  a {
    text-decoration: none;
    color: #000;
    font-weight: 300;
  }

  a.active {
    color: #000;
    font-weight: 700;
    border-bottom: 2px solid #f9d314;
  }

  hr {
    width: 100%;
    opacity: 0.4;
    margin-bottom: 5px;
  }
  .logout {
    position: absolute;
    bottom: 40px;
    right: 40px;
    background: red;
    border-radius: 5px;
    padding: 10px 20px;
    color: white;
  }
</style>
