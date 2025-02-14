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
    .add-btn{
      background-color: #FBDF56;
      border-radius: 10px;
      color: #2E2E2E;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      width: 165px;
      height: 36px;
    }
    span{
      font-size: 22px;
    }
  </style>