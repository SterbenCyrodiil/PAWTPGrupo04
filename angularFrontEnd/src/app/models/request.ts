export class Request {
    _id: String;
    idRequest: String;
    CCutente: String;
    trabalhadorDeRisco: Boolean;
    grupoDeRisco: Boolean;
    encaminhado_saude24: Boolean;
    
    tecnicoResponsavel: String;

    dataInicial: Date;
    resultadoInicial: Boolean
    dataFinal: Date;
    resultadoFinal: Boolean
    
    infetado: Boolean;
    casoFechado: Boolean;
    filepath: String;
	updated_at: Date;
}