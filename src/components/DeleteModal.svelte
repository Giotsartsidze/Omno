<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Webhook } from "../lib/type";
  import CloseButton from "./CloseButton.svelte";
  
    export let showDeleteModal: boolean = false;
    export let webhook: Webhook | null = null;
  
    const dispatch = createEventDispatcher();
  
    function confirm() {
      dispatch("confirm");
    }
  
    function cancel() {
      dispatch("cancel");
    }
  </script>
  
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  {#if showDeleteModal}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="modal-overlay" on:click={cancel}>
      <div class="modal" on:click|stopPropagation>
        <h2><strong>Deleting {webhook?.nickname}</strong></h2>
        <CloseButton on:close={cancel} />
        <p>Are you sure you want to delete selected webhook?  This action cannot be undone</p>
        <hr>
        <div class="actions">
          <button class="cancel-btn" on:click={cancel}>Cancel</button>
          <button class="confirm-btn" on:click={confirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    /* Modal Background */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    /* Modal Box */
    .modal {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      width: 450px;
      height: 210px;
      position: relative;
      text-align: center;
    }
    h2{
      text-align: left;
      margin-bottom: 20px;
    }
    p{
      text-align: left;
      margin-bottom: 30px;
    }
    hr{
      opacity: 0.5;
    }
  
    /* Buttons */
    .actions {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 20px;
    }
  
    .confirm-btn {
      background: #FF3507;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
  
    .cancel-btn {
      background: transparent;
      border: 1px solid #E6E6E6;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
  
    .confirm-btn:hover {
      background: #b02a37;
    }
  
    .cancel-btn:hover {
      background: #999;
    }
  </style>
  