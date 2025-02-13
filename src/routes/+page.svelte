<script lang="ts">
  import Filters from "../components/Filters.svelte";
  import WebhookTable from "../components/WebhookTable.svelte";
  import WebhookModal from "../components/WebhookModal.svelte";
  import AddWebhook from "../components/AddWebhook.svelte";
  import Notifications from "../components/Notifications.svelte";
  import "../styles/global.css";


  let showModal = false;
  let selectedWebhook: null = null;

  function openModal(event: CustomEvent) {
    selectedWebhook = event.detail.webhook;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedWebhook = null;
  }
</script>

<AddWebhook on:open={openModal} />
<Notifications />
<Filters />
<WebhookTable />

<WebhookModal {showModal} webhook={selectedWebhook} on:close={closeModal} />
