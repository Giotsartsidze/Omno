<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let showFilterModal: boolean;
  export let closeModal: () => void;
  export let selectedFilters: { date: string | null; authTypes: string[] };

  const dispatch = createEventDispatcher();

  const authOptions = ["No Authorization", "Custom Headers", "Basic Authorization", "Bearer", "OAuth 2.0"];

  function toggleAuthType(authType: string) {
    if (selectedFilters.authTypes.includes(authType)) {
      selectedFilters.authTypes = selectedFilters.authTypes.filter((type) => type !== authType);
    } else {
      selectedFilters.authTypes = [...selectedFilters.authTypes, authType];
    }
  }

  function clearAll() {
    selectedFilters.date = null;
    selectedFilters.authTypes = [];
    dispatch("updateFilters", { date: null, authTypes: [] });
  }

  function applyFilterSelection() {
    dispatch("updateFilters", { date: selectedFilters.date, authTypes: selectedFilters.authTypes });
    closeModal();
  }
</script>

{#if showFilterModal}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" on:click={closeModal} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && closeModal()}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="modal-content" on:click|stopPropagation>
      <h2>Filter</h2>

      <div class="date">
        <label for="date-created">Date Created</label>
        <input id="date-created" type="date" bind:value={selectedFilters.date} />
      </div>

      <div class="types">
        <label for="auth-type">Authorization Type</label>
        <div id="auth-type" class="filter-options">
          {#each authOptions as authType}
            <button
              class:selected={selectedFilters.authTypes.includes(authType)}
              on:click={() => toggleAuthType(authType)}
            >
              {authType}
            </button>
          {/each}
        </div>
      </div>

      <div class="modal-actions">
        <button class="clear" on:click={clearAll}>Clear All</button>
        <button class="apply-filter" on:click={applyFilterSelection}>
          Filter Selected ({selectedFilters.authTypes.length})
        </button>
      </div>
    </div>
  </div>
{/if}

  
  <style>
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
  
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 600px;
    }

    .date{
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 50px;
    }

    .date > input{
      width: 100%;
      border-radius: 5px;
      border: 1px solid #5d5d5d;
      padding: 5px;
    }

    label{
      font-size: 16px;
      color: #5d5d5d;
      width: 200px;
    }

    .types{
      display: flex;
      gap: 10px;
      justify-content: space-between;
      width: 100%;
    }
  
    .filter-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  
    .filter-options button {
      padding: 6px 10px;
      border: 1px solid #ddd;
      border-radius: 10px;
      cursor: pointer;
    }
  
    .filter-options button.selected {
      background-color: black;
      color: white;
    }
  
    .modal-actions {
      display: flex;
      justify-content: right;
      margin-top: 15px;
      gap: 20px;
    }

    .clear{
      background-color: transparent;
      border-radius: 5px;
      border: 1px solid #999;
      padding: 10px;
    }
  
    .apply-filter {
      background-color: #000;
      color: white;
      padding: 8px 12px;
      border-radius: 5px;
    }
  </style>
  