import { ListViewColumn, ListSort } from "@/models/ListViewModels";

export default class ListViewService {
  private columns: ListViewColumn[] = [
    {
      propertyName: "date",
      text: "Дата",
      sort: ListSort.None,
      sortFunc(a, b) {
        const x = a.date
          ? new Date(a.date.year, a.date.month - 1, a.date.day)
          : 0;
        const y = b.date
          ? new Date(b.date.year, b.date.month - 1, b.date.day)
          : 0;
        return x < y ? -1 : x > y ? 1 : 0;
      }
    },
    {
      propertyName: "type",
      text: "Операция",
      sort: ListSort.None,
      sortFunc(a, b) {
        return a.type < b.type ? -1 : a.type > b.type ? 1 : 0;
      }
    },
    {
      propertyName: "assessment",
      text: "Качество",
      sort: ListSort.None,
      sortFunc(a, b) {
        const x = a.assessment ?? 99;
        const y = b.assessment ?? 99;
        return x < y ? -1 : x > y ? 1 : 0;
      }
    },
    {
      propertyName: "comment",
      text: "Комментарий",
      sort: ListSort.None,
      sortFunc(a, b) {
        const x = (a.comment || "").toLowerCase();
        const y = (b.comment || "").toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      }
    }
  ];

  getColumns(): Promise<ListViewColumn[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const cloned = this.columns.slice(0);
        resolve(cloned);
      }, 10);
    });
  }
}
