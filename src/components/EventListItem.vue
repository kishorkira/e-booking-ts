<template>
  <b-card
    v-bind:title="event.title"
    v-bind:img-src="event.cover"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem"
    class="mb-2"
  >
    <div class="d-flex justify-content-between mb-2 mt-2">
      <span>{{ event.date }}</span>
      <span>Tickets Available: {{ event.availableTickets }}</span>
    </div>
    <b-button
      class="col-12"
      v-if="event.availableTickets > 0"
      @click.self="$emit('book-event')"
      variant="outline-success"
      >Book event</b-button
    >
    <b-button class="col-12" v-else disabled variant="outline-danger"
      >Sold out</b-button
    >
  </b-card>
</template>

<script lang="ts" >
import { Component, Vue, Prop } from "vue-property-decorator";
import Event from "@/models/event";

@Component({})
export default class EventListItem extends Vue  {
  @Prop({ default: () => {}, required: true })
  event!: Event;

}
</script>

<style scoped>
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
</style>