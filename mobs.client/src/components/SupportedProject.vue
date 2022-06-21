<template>
  <div id="supported-project" @click="goTo">
    <img :src="support.project?.img" alt="" />
    <p>{{ support.project.name }}</p>
    <p>{{ formatDate(support.createdAt) }}</p>
    <p>{{ support.tier.name }}</p>
    <p>${{ support.tier.cost }}</p>
    <i class="mdi mdi-delete-forever-outline" @click.stop="deleteSupport" title="create project"></i>
  </div>
</template>

<script>
import { supportsService } from '../services/SupportsService.js'
import Pop from '../utils/Pop.js'


export default {
  props: {
    support: { type: Object, required: true }
  },
  setup(props) {
    return {
      async deleteSupport() {
        try {
          if (await Pop.confirm('Cancel Support?', 'are you sure you want to stop supporting this project?', 'info', 'yes cancel it')) {
            await supportsService.deleteSupport(props.support.id)
          }
        } catch (error) {
          Pop.error(error)

        }
      },
      formatDate(rawDate) {
        let time = new Date(rawDate)
        let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(time)
        let year = time.getUTCFullYear()
        return `${month} ${year}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

#supported-project {
  background: lighten($light, 40);
  border-radius: inherit;
  margin: 0.6em 0;
  border-radius: 8px;
  @include bigShadow($dark, 0.9);
  @include selectable($secondary);

  img {
    float: left;
    height: 7.5em;
    width: 11em;
    margin-right: 0.5em;
    object-fit: cover;
    border-radius: inherit;
  }

  // project name
  p:nth-child(2) {
    margin-top: 1.7em;
    margin-bottom: 0.4em;
    font-weight: 700;
    display: block;
  }

  // time stamp
  p:nth-child(3) {
    color: lighten($dark, 30);
    display: inline-block;
    width: 25%;
  }

  // tier name
  p:nth-child(4) {
    font-weight: 500;
    color: $info;
    display: inline-block;
    width: 30%;
    transform: translateY(-0.6em);
  }

  // cost
  p:nth-child(5) {
    color: $primary;
    @include baloo(700);
    display: inline-block;
    width: 20%;
    transform: translateY(-0.6em);
  }

  i {}

  // icon
  .mdi.mdi-delete-forever-outline {
    &::before {
      font-size: 20px;
      width: auto;
      transform: translateY(-0.6rem);
      transition: all 0.1s ease;
    }

    &:hover::before {
      cursor: pointer;
      color: $danger;
      transform: translateY(-0.55em) scale(1.5);
    }
  }
}
</style>
