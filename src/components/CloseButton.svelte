<!-- src/components/CloseButton.svelte -->
<script lang="ts">
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();
  
    function close() {
      dispatch("close");
    }
  </script>
  
  <button class="close-btn" on:click={close}>×</button>
  
  <style>
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: 1px solid #E6E6E6;
      padding: 8px;
      border-radius: 5px;
      font-size: 20px;
      color: #999;
      cursor: pointer;
    }
  
    .close-btn:hover {
      color: #333;
    }
  </style>
  