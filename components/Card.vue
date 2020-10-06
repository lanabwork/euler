<template>
  <el-card class="card" :style="bankStyle">
    <el-row :gutter="20">
      <el-col :span="18" class="el-col--flex-row el-col--align-end">
        <div class="card__bank-logo">
          <img
            v-if="bank.bankLogoSmallLightSvg"
            :src="bank.bankLogoSmallLightSvg"
            :alt="bank.bankNameLocal">
        </div>
        <div class="card__bank-name" v-if="bank.bankNameLocal">{{ bank.bankNameLocal }}</div>
      </el-col>
      <el-col :span="6" class="el-col--justify-end">
        <i
          :class="[{'disabled': !filledAllFields}, 'el-icon-circle-check']"
          @click="createCard"
          v-if="!isCreated">
        </i>
        <i
          :class="[{'disabled': !filledAllFields}, 'el-icon-circle-check']"
          @click="saveCard"
          v-if="isCreated && !isSaved">
        </i>
        <i
          class="el-icon-edit"
          @click="editCard"
          v-if="isCreated && isSaved">
        </i>
        <i
          class="el-icon-delete"
          @click="removeCard(id)">
        </i>
      </el-col>
    </el-row>
    <el-row>
    <el-row>
      <el-col :span="24">
        <el-input
          type="text"
          v-if="!isCreated || !isSaved"
          placeholder="Имя карты кириллицей*"
          maxlength='20'
          v-model="localName"/>
        <div class="card__name" v-if="isCreated && isSaved">{{ localName }}</div>
      </el-col>
    </el-row>
      <el-col :span="24">
        <el-input
          v-if="!isCreated"
          type="text"
          placeholder="Номер карты (16 цифр)*"
          v-model="localNumber"
          v-mask="'####-####-####-####'"
          maxlength='20' />
        <div class="card__number" v-if="isCreated">{{ maskedLocalNumber }}</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import { mask } from 'vue-the-mask';
  import { debounce } from 'lodash';
  import { api, messages } from '@/constants/config';

  export default {
    directives: {
      mask,
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        default: ''
      },
      number: {
        type: String,
        default: ''
      },
      isCreated: {
        type: Boolean,
      },
      isSaved: {
        type: Boolean,
      },
      bank: {
        type: Object
      },
    },
    computed: {
      bankStyle() {
        if (this.bank.formBackgroundColor && this.bank.formTextColor) {
          const bg = `background-color: ${this.bank.formBackgroundColor}`;
          const textColor = `color: ${this.bank.formTextColor}`;
          return `${bg}; ${textColor}`;
        } else {
          return '';
        }
      },
      localName: {
        get() {
          return this.name;
        },
        set(value) {
          const text = value.replace(/[a-zA-Z]/g,'');
          this.$store.dispatch('cards/edit', {id: this.id, name: 'name', value: text});
        },
      },
      localNumber: {
        get() {
          return this.number;
        },
        set(value) {
          const number = value.replace(/-/g, '');
          this.$store.dispatch('cards/edit', {id: this.id, name: 'number', value});
          this.debouncedCheckBank(number);
        },
      },
      maskedLocalNumber() {
        let number = this.localNumber;
        for (let i = 6; i < 12; i++) {
          number = this.setCharAt(number,i,'x');
        }
        number = [...number].map((d, i) => (i) % 4 === 0  && i > 3 ? '-' + d : d).join('').trim()
        return number;
      },
      filledAllFields() {
        if (!this.isCreated) {
          return this.localNumber.length === 19 && this.localName.length >= 1;
        } else {
          return this.localNumber.length === 16 && this.localName.length >= 1;
        }
      }
    },
    created() {
      this.debouncedCheckBank = debounce(this.checkBank, 500);

      this.checkBank(this.number);
    },
    methods: {
      createCard() {
        if (!this.filledAllFields) {
          this.$message({
            message: messages.savedCardError,
            type: 'error'
          });
          return false;
        }
        const number = this.localNumber.replace(/-/g, '');

        this.$store.dispatch('cards/edit', {id: this.id, name: 'isCreated', value: true});
        this.$store.dispatch('cards/edit', {id: this.id, name: 'isSaved', value: true});
        this.$store.dispatch('cards/edit', {id: this.id, name: 'number', value: number});
        this.$message({
          message: messages.editedCard,
          type: 'success'
        });
      },
      editCard() {
        this.$store.dispatch('cards/edit', {id: this.id, name: 'isSaved', value: false});
      },
      saveCard() {
        if (!this.filledAllFields) {
          this.$message({
            message: messages.savedCardError,
            type: 'error'
          });
          return false;
        }
        this.$store.dispatch('cards/edit', {id: this.id, name: 'isSaved', value: true});
        this.$message({
          message: messages.editedCard,
          type: 'success'
        });
      },
      setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substr(0, index) + chr + str.substr(index + 1);
      },
      async checkBank(number) {
        try {
          const response = await this.$axios.$get(
            api.url,
            {
              params: {
                apiKey: api.token,
                input: number
              }
            }
          )
          const {
            bankNameLocal,
            formBackgroundColor,
            bankLogoSmallLightSvg,
            formTextColor
          } = response;

          this.$store.dispatch(
            'cards/edit',
            {
              id: this.id,
              name: 'bank',
              value: {
                bankNameLocal,
                formBackgroundColor,
                bankLogoSmallLightSvg,
                formTextColor
              }
            },
          );
        } catch (e) {
          console.error(e);
          this.$message({
            message: messages.checkBankError,
            type: 'error'
          });
        }
      },
      removeCard(id) {
        this.$store.dispatch('cards/remove', id);
        this.$message({
          message: messages.removedCard,
          type: 'success'
        });
      },
    },
  }
</script>

<style lang="scss">
  .card {
    &__bank-logo {
      height: 30px;
      margin-right: 10px;

      img {
        height: 100%;
      }
    }

    &__name,
    &__number {
      height: 40px;
      display: flex;
      align-items: center;
    }
  }
</style>

