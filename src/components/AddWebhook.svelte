<script lang="ts">
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();
  
    function handleClick() {
      dispatch("open", { webhook: null });
    }
  </script>
  
  <button on:click={handleClick} class="add-btn">
    Create Webhook <span>+</span>
  </button>
  
  <style>
    button{
      background-color: #FBDF56;
      border-radius: 5px;
      padding: 10px 20px;
      color: #2E2E2E;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 5px;
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 10px 20px;
    }
    span{
      font-size: 22px;
    }
  </style>