import moment from 'moment'
import { ref } from 'vue'

export enum DateType {
  START_OF_DAY = 'START_OF_DAY',
  END_OF_DAY = 'END_OF_DAY',
}

export function useSelectDate(
  initalDate: Date,
  dateType: DateType = DateType.START_OF_DAY
) {
  const date = ref(initalDate)

  function update(updatedDate: Date) {
    date.value = updatedDate
  }

  const value = computed<Date>(() => {
    switch (dateType) {
      case DateType.END_OF_DAY:
        return moment(date.value).endOf('day').toDate()
      case DateType.START_OF_DAY:
        return moment(date.value).startOf('day').toDate()
    }
  })

  return { value, update }
}
