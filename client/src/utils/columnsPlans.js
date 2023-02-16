export function columnsPlans(id_slButton, id_sl) {
  if (id_sl === 0) {
    if (id_slButton !== "16-а00135") {
      return [
        { title: "№ п/п", path: "number", id: 1, width: 30 },
        { title: "Дата", path: "data_rabot", id: 2, width: 20 },
        {
          title: "Планируемые работы",
          path: "id_vid_rabot",
          id: 3,
          width: 200,
        },
        { title: "Способ проведения работ", path: "sposob", id: 4, width: 50 },
        { title: "Объект", path: "id_object", id: 5, width: 200 },
        {
          title: "Состав бригады / наименование подрядной организации",
          path: "Brigada",
          id: 6,
          width: 100,
        },
        { title: "Тип транспорта", path: "avto", id: 7, width: 0 },
        {
          title: "Cогласованный автомобиль Марка - Гос.№",
          path: "id_gn",
          id: 8,
          width: 0,
        },
        { title: "Комментарий", path: "comment", id: 9, width: 0 },
        {
          title: "Согласование работ повышенной опасности",
          path: "OPASN",
          id: 10,
          width: 100,
        },
        // { title: "Отметка о выполнении", path: "vipolneno", id: 11, width: 0 },
        //{ title: "", path: "delete", id: 12, width: 0 },
      ];
    } else {
      return [
        { title: "№ п/п", path: "number", id: 1, width: 30 },
        { title: "Дата", path: "data_rabot", id: 2, width: 20 },
        {
          title: "Планируемые работы",
          path: "id_vid_rabot",
          id: 3,
          width: 200,
        },
        { title: "Способ проведения работ", path: "sposob", id: 4, width: 50 },
        { title: "Объект", path: "id_object", id: 5, width: 200 },
        {
          title: "Состав бригады / наименование подрядной организации",
          path: "Brigada",
          id: 6,
          width: 100,
        },
        { title: "Тип транспорта", path: "avto", id: 7, width: 0 },
        {
          title: "Cогласованный автомобиль Марка - Гос.№",
          path: "id_gn",
          id: 8,
          width: 0,
        },
        { title: "Комментарий", path: "comment", id: 9, width: 0 },
        {
          title: "Согласование работ повышенной опасности",
          path: "OPASN",
          id: 10,
          width: 100,
        },
        // { title: "Отметка о выполнении", path: "vipolneno", id: 11, width: 0 },
        { title: "", path: "add_auto", id: 12, width: 0 },
      ];
    }
  } else {
    return [
      { title: "№ п/п", path: "number", id: 1, width: 30 },
      { title: "Дата", path: "data_rabot", id: 2, width: 20 },
      { title: "Планируемые работы", path: "id_vid_rabot", id: 3, width: 200 },
      { title: "Способ проведения работ", path: "sposob", id: 4, width: 50 },
      { title: "Объект", path: "id_object", id: 5, width: 200 },
      {
        title: "Состав бригады / наименование подрядной организации",
        path: "Brigada",
        id: 6,
        width: 100,
      },
      { title: "Тип транспорта", path: "avto", id: 7, width: 0 },
      {
        title: "Cогласованный автомобиль Марка - Гос.№",
        path: "id_gn",
        id: 8,
        width: 0,
      },
      { title: "Комментарий", path: "comment", id: 9, width: 0 },
      {
        title: "Согласование работ повышенной опасности",
        path: "OPASN",
        id: 10,
        width: 100,
      },
      { title: "Отметка о выполнении", path: "vipolneno", id: 11, width: 0 },
      { title: "", path: "delete", id: 12, width: 0 },
    ];
  }
}
