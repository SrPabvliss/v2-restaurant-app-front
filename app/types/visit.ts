interface Visit {
    //id: number; //no se si es necesario (autogenerated?)
    startDateTime: Date;
    endDateTime: Date;
    customerId: string | null;
    tableId: number ;
    //idcliente a la que pertenece (cómo se hace eso llama a dios?)
}