<script lang="ts">
  import "../../Styles/global.css";
  import { statuses } from "$lib/statusStore";

</script> 

<div class="container">
  <table>
    <thead>
      <tr>
        <th>Create date</th>
        <th>HTTP code </th>
        <th>Failures</th>
        <th>Status</th>
        <th>Message</th>
        <th>Last try</th>
        <th>Next try</th>
      </tr>
    </thead>
    <tbody>
      {#each $statuses as status (status.id)}
        <tr>
          <td>{new Date(status.createdAt).toLocaleDateString()}</td>
          <td>{status.httpCode}</td>
          <td>{status.failures}</td>
          <td class="{status.status === 'Active' ? 'active' : 'inactive'}">{status.status} </td>
          <td>{status.message}</td>
          <td>{new Date(status.lastTry).toLocaleDateString()}</td>
          <td>{new Date(status.nextTry).toLocaleDateString()}</td>
          <td><button><img src="/reload.svg" alt="">Resend</button></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>


<style>
  .active {
  background-color: #1ACC79; 
  color: #fff;
  border:none;
  border-radius: 10px;
  text-align: center;
}

.inactive {
  background-color: #FF3507; 
  color: #fff; 
  border: none;
  border-radius: 10px;
  text-align: center;
}

button{
  background-color: transparent; 
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 5px  ;
}

</style>