import { TestBed } from '@angular/core/testing';

import { PedidosDiagnosticoService } from './pedidos-diagnostico.service';

describe('PedidosDiagnosticoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidosDiagnosticoService = TestBed.get(PedidosDiagnosticoService);
    expect(service).toBeTruthy();
  });
});
