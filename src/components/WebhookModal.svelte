<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { Webhook } from "../lib/type";
  import { addWebhook, updateWebhook } from "../lib/store";

  export let showModal: boolean = false;
  export let webhook: Webhook ;
  

  let customHeaders: { key: string; value: string }[] = [];

  function addHeaderRow() {
    customHeaders = [...customHeaders, { key: "", value: "" }];
  }

  function removeHeaderRow(index: number) {
    customHeaders = customHeaders.filter((_, i) => i !== index);
  }

  const dispatch = createEventDispatcher();

  let nickname: string = "";
  let url: string = "";
  let authType: Webhook["authType"] = "No Authorization";
  let username: string = "";
  let password: string = "";
  let token: string = "";
  let oAuthAuthor: string = "";
  let tokenEndpoint: string = "";
  let clientId: string = "";
  let clientSecret: string = "";
  let grantType: string = "";
  
  export let selectedFilters = {
    date: null,
    payInAuthTypes: [] as string[], 
    payOutAuthTypes: [] as string[],
  };

  const PayOptions = [
    "Created",
    "Pending",
    "Waiting for Confirmation",
    "Processed",
    "Rejected",
  ];
  const eventToSendData = {
    payIn: false,
    payOut: false,
  };

  function toggleAuthType(authType: string, type: "payIn" | "payOut") {
    let authList =
      type === "payIn"
        ? selectedFilters.payInAuthTypes
        : selectedFilters.payOutAuthTypes;

    if (authList.includes(authType)) {
      authList = authList.filter((type) => type !== authType);
    } else {
      authList = [...authList, authType];
    }

    if (type === "payIn") {
      selectedFilters.payInAuthTypes = authList;
    } else {
      selectedFilters.payOutAuthTypes = authList;
    }
  }

  function save() {
    if (nickname.trim() === "" || url.trim() === "") {
      alert("Please enter a nickname and URL!");
      return;
    }

    if (webhook) {
      updateWebhook({ ...webhook, nickname, url, authType });
    } else {
      addWebhook({
        nickname,
        url,
        authType,
        createdAt: new Date().toISOString(),
      });
    }
    close();
  }

  function close() {
    dispatch("close");
  }

  function handleOverlayClick(event: Event) {
    if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
      close();
    }
  }

  function setAuthType(type: Webhook["authType"]) {
    authType = type;
  }

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if showModal}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" on:click={close}>
    <div class="modal" on:click|stopPropagation>
      <h2>{webhook ? "Edit Webhook" : "Create Webhook"}</h2>


      <div class="inp-row">
        <div class="nickname">
          <label for="nickname">Nickname</label>
          <input id="nickname" type="text" bind:value={nickname} placeholder="Enter nickname" />
        </div>

        <div class="url">
          <label for="url">Webhook URL</label>
          <input id="url" type="url" bind:value={url} placeholder="Enter URL" />
        </div>
      </div>

      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>Authorization Type</label>
      <div class="auth-type-tags">
        {#each ["No Authorization", "Custom Header", "Basic Authentication", "Bearer Token", "OAuth 2.0"] as type}
          <button
            type="button"
            class="auth-type-tag"
            class:selected={authType === type}
            on:click={() => setAuthType(type as Webhook["authType"])}
          >
            {type}
          </button>
        {/each}
      </div>

      {#if authType === "Custom Header"}
        <div class="custom-header-section">
          {#each customHeaders as header, index}
            <div class="header-row">
              <input type="text" bind:value={header.key} placeholder="Key" />
              <input type="text" bind:value={header.value} placeholder="Value" />
              <button class="remove-btn" on:click={() => removeHeaderRow(index)}>×</button>
            </div>
          {/each}
          <button class="add-row-btn" on:click={addHeaderRow}>+ Add Row</button>
        </div>
      {/if}
      {#if authType === "Basic Authentication"}
        <div class="basic-auth-section">
          <div class="inp-row">
            <div class="username">
              <label for="username">Username</label>
              <input id="username" type="text" bind:value={username} placeholder="Enter Username" />
            </div>

            <div class="password">
              <label for="password">Password</label>
              <input id="password" type="password" bind:value={password} placeholder="Enter Password" />
            </div>
          </div>
        </div>
      {/if}

      {#if authType === "Bearer Token"}
      <div class="custom-header-section">
    
        <div class="username">
          <label for="username">Token</label>
          <input id="username" type="text" bind:value={token} placeholder="e.g 123.456.78" />
        </div>
      </div>
    {/if}

    {#if authType === "OAuth 2.0"}
    <div class="oauth2-section">
      <div class="inp-row">
        <div class="oAuthAuthor">
          <label for="oAuthAuthor">OAuth Author</label>
          <input id="oAuthAuthor" type="text" bind:value={oAuthAuthor} placeholder="Enter OAuth Author" />
        </div>
        <div class="tokenEndpoint">
          <label for="tokenEndpoint">Token Endpoint</label>
          <input id="tokenEndpoint" type="text" bind:value={tokenEndpoint} placeholder="Enter Token Endpoint" />
        </div>
      </div>

      <div class="third-row">
        <div class="clientId">
          <label for="clientId">Client ID</label>
          <input id="clientId" type="text" bind:value={clientId} placeholder="Enter Client ID" />
        </div>

        <div class="clientSecret">
          <label for="clientSecret">Client Secret</label>
          <input id="clientSecret" type="password" bind:value={clientSecret} placeholder="Enter Client Secret" />
        </div>

        <div class="grantType">
          <label for="grantType">Grant Type</label>
          <input id="grantType" type="text" bind:value={grantType} placeholder="Enter Grant Type" />
        </div>
      </div>
    </div>
  {/if}

      <div class="event-cont">
        <div class="top-cont">
          <p>Event to send</p>
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="drop-down first"
          class:active={eventToSendData.payIn}
          on:click={() => (eventToSendData.payIn = !eventToSendData.payIn)}
        >
          <div class="info-cont">
            <div class="layer">
              <img src="/check.svg" class="check-icon" alt="icon" />
              <p>
                <b>Pay In</b>
                {#if selectedFilters.payInAuthTypes.length > 0}
                  {selectedFilters.payInAuthTypes.join(", ")}
                {:else}
                  No filters selected
                {/if}
              </p>
            </div>
            <div class="icon">
              <img src="/dropdown.svg" alt="icon" />
            </div>
          </div>
          <div class="content">
            <div class="types">
              <div id="auth-type" class="filter-options">
                {#each PayOptions as authType}
                  <button
                    class:selected={selectedFilters.payInAuthTypes.includes(
                      authType
                    )}
                    on:click={() => toggleAuthType(authType, "payIn")}
                  >
                    {authType}
                  </button>
                {/each}
              </div>
            </div>
          </div>
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="drop-down"
          class:active={eventToSendData.payOut}
          on:click={() => (eventToSendData.payOut = !eventToSendData.payOut)}
        >
          <div class="info-cont">
            <div class="layer">
              <img src="/tire.svg" class="check-icon" alt="icon" />
              <p>
                <b>Pay Out</b>
                {#if selectedFilters.payOutAuthTypes.length > 0}
                  {selectedFilters.payOutAuthTypes.join(", ")}
                {:else}
                  No filters selected
                {/if}
              </p>
            </div>
            <div class="icon">
              <img src="/dropdown.svg" alt="icon" />
            </div>
          </div>
          <div class="content">
            <div class="types">
              <div id="auth-type" class="filter-options">
                {#each PayOptions as authType}
                  <button
                    class:selected={selectedFilters.payOutAuthTypes.includes(
                      authType
                    )}
                    on:click={() => toggleAuthType(authType, "payOut")}
                  >
                    {authType}
                  </button>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button on:click={save} class="save-btn"><span>+</span> Create</button>
      </div>
    </div>
  </div>
{/if}


<style>
  .event-cont {
    width: 100%;
    border-radius: 10px;
    margin-top: 30px;
    border: 1px solid #ccc;
  }
  .event-cont .top-cont {
    position: relative;
    padding: 20px;
  }
  .event-cont .top-cont p {
    font-size: 24px;
  }
  .event-cont .top-cont::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .event-cont .drop-down {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    max-height: 86px;
    padding: 24px;
    overflow: hidden;
    transition: 1s;
    position: relative;
  }
  .event-cont .drop-down.first::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ccc;
  }
  .event-cont .drop-down.active {
    max-height: 1000px;
  }
  .event-cont .drop-down .content {
    margin-top: 40px;
  }
  .event-cont .drop-down .info-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .event-cont .drop-down .info-cont .layer {
    display: flex;
  }
  .event-cont .drop-down .info-cont .check-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .event-cont .drop-down .icon {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
  .event-cont .drop-down .icon img {
    width: 20px;
  }
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

  .modal {
    background: white;
    position: relative;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 800px;
    max-width: 90%;
    text-align: left;
  }

  h2 {
    margin-bottom: 40px;
  }

  .inp-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .nickname,
  .url {
    width: 48%;
  }

  label {
    font-size: 14px;
    color: #747474;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .auth-type-tags {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 10px;
  }

  .auth-type-tag {
    padding: 8px 16px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .auth-type-tag:hover {
    background-color: #e0e0e0;
  }

  .auth-type-tag.selected {
    background-color: #333;
    color: white;
  }

  .actions {
    margin-top: 15px;
    width: 100%;
  }

  .save-btn {
    background: #212121;
    color: white;
    border: none;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    margin-right: 5px;
    font-size: 17px;
  }

  .types {
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


  /* /Custom header */
  .custom-header-section {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .header-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .header-row input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .remove-btn {
    background: transparent;
    color: black;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  .add-row-btn {
    margin-top: 10px;
    background: transparent;
    color: black;
    border: none;
    padding: 8px 12px;
    cursor: pointer;

  }

  /* //Base auth  */
  .basic-auth-section{
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .username{
    width: 100%;
  }
  
  .password{
    width: 100%;
  }
  .inp-row input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .inp-row {
    gap: 20px;
  }


  /* //auth 2. 0 */
  .oauth2-section {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .oauth2-section .inp-row {
  gap: 15px;
  margin-bottom: 20px;
  flex-direction: column;
}
  .oAuthAuthor {
    width: 100%;
}
.tokenEndpoint {
  width: 100%;
}

.oauth2-section input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.oauth2-section .third-row {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.oauth2-section .third-row .clientId,
.oauth2-section .third-row .clientSecret,
.oauth2-section .third-row .grantType {
  flex: 1;
}

.oauth2-section label {
  font-weight: 600;
  margin-bottom: 5px;
}

.oauth2-section .third-row input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

</style>
