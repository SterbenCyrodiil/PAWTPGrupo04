import { TestBed } from '@angular/core/testing';

import { UpdatePedidosService } from './update-pedidos.service';

describe('UpdatePedidosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatePedidosService = TestBed.get(UpdatePedidosService);
    expect(service).toBeTruthy();
  });
});
