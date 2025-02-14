<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { deleteWebhook } from "../lib/store";
  import type { Webhook } from "../lib/type";
  import DeleteModal from "./DeleteModal.svelte";
  import WebhookModal from "./WebhookModal.svelte";
  import { onMount } from 'svelte';

  export let webhook: Webhook;

  const dispatch = createEventDispatcher();
  let showDeleteModal = false;
  let showMenu = false; 
  let menuRef: HTMLDivElement; 
  let showModal = false; 

  let iconRef: HTMLDivElement; 

 function edit() {
  showModal = true; 
  dispatch("edit", webhook);
  showMenu = false;
}

function closeAllModals() {
    showDeleteModal = false;
    showModal = false;
    showMenu = false; // Optionally close the menu as well
  }


  function confirmDelete() {
    showDeleteModal = true;
    showMenu = false; 
  }

  function handleConfirm() {
    deleteWebhook(webhook.id);
    showDeleteModal = false;
  }

  function handleCancel() {
    showDeleteModal = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef && !menuRef.contains(event.target as Node) && !iconRef.contains(event.target as Node)) {
      showMenu = false;
    }
  }
  
  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="icon-container" bind:this={iconRef} on:click={() => showMenu = !showMenu}>
  <img src="/Button.svg" alt="Actions" class="action-icon" />
  {#if showMenu}
    <div class="menu" bind:this={menuRef}>
      <button on:click={edit}>Edit</button>
      <button on:click={confirmDelete} class="delete">Delete</button>
    </div>
  {/if}
</div>

<DeleteModal 
  {showDeleteModal} 
  {webhook} 
  on:confirm={handleConfirm} 
  on:cancel={handleCancel} 
/>
<WebhookModal 
  {webhook} 
  {showModal} 
  on:close={() => {
    showModal = false;
    showMenu = false;
  }} 
/>

<style>
  .icon-container {
    position: relative;
    display: inline-block;
  }

  .action-icon {
    cursor: pointer;
    width: 36px;
    height: 36px;
    position: relative;
  }

  .menu {
    position: absolute;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    top: 0px; 
    right: 0;
    width: 120px;
    z-index: 100;
  }

  .menu button {
    width: 100%;
    padding: 10px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
  }

  .menu button:hover {
    background-color: #f0f0f0;
  }

  .delete {
    color: red;
  }
</style>
