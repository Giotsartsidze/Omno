<script lang="ts">
  import WebhookModal from "../components/WebhookModal.svelte";
  import FilterModal from "../components/FilterModal.svelte";
  import ActionsMenu from "./ActionsMenu.svelte";
  import { webhooks } from "../lib/store";
  import type { Webhook } from "../lib/type";

  let showModal = false;
  let selectedWebhook: Webhook | null = null;
  let filters: { date: string | null; authTypes: string[] } = {
    date: null,
    authTypes: [],
  };
  let showFilterModal = false;
  let selectedFilters: { date: string | null; authTypes: string[] } = {
    date: null,
    authTypes: [],
  };

  function updateFilters(event: CustomEvent) {
    selectedFilters = event.detail;
  }

  function openModal(event: CustomEvent) {
    selectedWebhook = event.detail.webhook;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedWebhook = null;
  }

  function toggleFilterModal() {
    showFilterModal = !showFilterModal;
  }

  function applyFilters(newFilters: {
    date: string | null;
    authTypes: string[];
  }) {
    filters = newFilters;
    selectedFilters = newFilters;
  }
  function removeDateFilter() {
    filters.date = null;
    selectedFilters.date = null;
  }

  function removeAuthTypeFilter(authType: string) {
    filters.authTypes = filters.authTypes.filter((type) => type !== authType);
    selectedFilters.authTypes = selectedFilters.authTypes.filter(
      (type) => type !== authType
    );
  }

  function isWebhookFiltered(webhook: Webhook) {
    if (filters.date && !webhook.createdAt.startsWith(filters.date)) {
      return false;
    }
    if (
      filters.authTypes.length > 0 &&
      !filters.authTypes.includes(webhook.authType)
    ) {
      return false;
    }
    return true;
  }

  function clearAllFilters() {
    filters = { date: null, authTypes: [] };
    selectedFilters = { date: null, authTypes: [] };
  }
</script>

<FilterModal
  {showFilterModal}
  closeModal={() => (showFilterModal = false)}
  {selectedFilters}
  on:updateFilters={updateFilters}
/>
<button class="filter-button" on:click={toggleFilterModal}
  ><img src="/filter.svg" alt="" />Filter</button
>

<WebhookModal {showModal} webhook={selectedWebhook} on:close={closeModal} />

{#if selectedFilters.date || selectedFilters.authTypes.length > 0}
  <div class="selected-filters">
    {#if selectedFilters.date}
      <div class="filter-tag">
        {selectedFilters.date}
        <button on:click={removeDateFilter}>✖</button>
      </div>
    {/if}

    {#each selectedFilters.authTypes as authType}
      <div class="filter-tag">
        {authType}
        <button on:click={() => removeAuthTypeFilter(authType)}>✖</button>
      </div>
    {/each}

    <button class="clear-all-button" on:click={clearAllFilters}
      >Clear All</button
    >
  </div>
{/if}

<table>
  <thead>
    <tr>
      <th>Nickname</th>
      <th>Webhook URL</th>
      <th>Created Date</th>
      <th>Last Modified</th>
      <th>Authorization Type</th>
    </tr>
  </thead>
  <tbody>
     {#each $webhooks as webhook (webhook.id)}
      {#if isWebhookFiltered(webhook)}
        <tr>
          <td>{webhook.nickname}</td>
          <td>{webhook.url}</td>
          <td>{new Date(webhook.createdAt).toLocaleDateString()}</td>
          <td>
            <img
              class="avatar"
              src="/Avatar.svg"
              alt="Avatar Icon"
            />{webhook.modifiedBy}
          </td>
          <td>{webhook.authType}</td>
          <td>
            <ActionsMenu {webhook} on:edit={(e) => openModal(e)} />
          </td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

<style>
  .selected-filters {
    display: flex;
    align-items: center;
    gap: 8px; 
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 6px;
  }

  .filter-tag {
    display: flex;
    align-items: center;
    color: black;
    background: #f5f5f5;
    padding: 5px 10px;
    border-radius: 16px;
    font-size: 14px;
  }

  .filter-tag button {
    background: transparent;
    border: none;
    border-radius: 50%;
    color: black;
    margin-left: 5px;
    cursor: pointer;
  }

  .filter-tag button:hover {
    color: red;
  }
  .filter-button {
    padding: 8px 12px;
    background-color: white;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
    position: absolute;
    right: 20px;
    top: 85px;
  }

  .clear-all-button {
    background: #f5f5f5;
    color: black;
    border: none;
    padding: 5px 12px;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 10px;
    font-size: 14px;
  }

  .clear-all-button:hover {
    background: darkred;
  }
  img {
    width: 10px;
    height: 10px;
    margin-right: 10px;
  }
  .avatar {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
</style>
