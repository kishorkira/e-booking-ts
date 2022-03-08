<template>
  <b-container>
    <div class="events-container">
      <div class="events-header">
        <h2>Events({{ filteredEvents.length }})</h2>
        <b-form-input
          size="small"
          v-model="search"
          placeholder="Search by Event Title"
        ></b-form-input>
      </div>
      <div v-if="filteredEvents.length">
        <b-row>
          <b-col sm="4" :key="event.id" v-for="event in filteredEvents">
            <EventListItem
              :event="event"
              @book-event="bookEvent(event)"
            />
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <h5>No results found! 😢</h5>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import EventListItem from "./EventListItem.vue";
import Event from "@/models/event";

@Component({
  components: {
    EventListItem,
  },
})
export default class EventList extends Vue {
  @Prop({ required: true })
  events!: Event[];

  search: string = "";

  get filteredEvents() {
    if (!this.search.trim()) return this.events;
    const regex = new RegExp(`^${this.search}`, "i");
    return this.events.filter((e) => regex.test(e.title));
  }

  @Emit()
  bookEvent(event: Event){
    return event;
  }
}
</script>

<style scoped>
.events-container {
  margin: 10px 30px;
  border: 1px solid black;
  padding: 20px;
  border-radius: 5px;
}
.events-header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.events-header input {
  max-width: 280px;
}
</style>