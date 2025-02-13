<script>
  import { webhooks, allWebhooks } from "../lib/store.js";
  
  let search = "";
  webhooks.set($allWebhooks)

  function filterWebhooks() {
    if (search === "") {
      // If search is empty, reset the list to the original full list
      webhooks.set([...$allWebhooks]);
    } else {
      // Filter the list based on the search input
      webhooks.update((list) =>
        list.filter((hook) =>
          hook.nickname.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }
</script>


<div class="search-container">
  <input
    type="text"
    bind:value={search}
    on:input={filterWebhooks}
    placeholder="Search ..."
  />
  <img src="/Icon.svg" alt="Search icon" class="search-icon" />
  
</div>

<style>
  .search-container {
    position: relative;
    width: 40%;
  }

  input {
    padding: 8px 10px 8px 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10px;
  }

  .search-icon {
    position: absolute;
    left: 10px; 
    top: 50%;
    transform: translateY(-90%); 
    width: 16px; 
    height: 16px; 
  }
</style>
