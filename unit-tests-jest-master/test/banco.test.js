// Atividade prática
const Banco = require("../src/banco");

describe("Testes da classe Banco", () => {
  let conta;
  let contaDestino;

  beforeEach(() => {
    conta = new Banco("Fulano", 100);
    contaDestino = new Banco("Ciclano", 200);
  });

  test("Teste de Depósito", () => {
    expect(conta.depositar(50)).toBe(150);
  });

  test("Teste de Saque", () => {
    expect(conta.sacar(30)).toBe(70);
  });

  test("Teste de Saque com Saldo Insuficiente", () => {
    expect(() => conta.sacar(200)).toThrow("Saldo insuficiente");
  });

  test("Teste de Transferência", () => {
    conta.transferir(50, contaDestino);
    expect(conta.obterSaldo()).toBe(50);
    expect(contaDestino.obterSaldo()).toBe(250);
  });

  test("Teste de Transferência com Saldo Insuficiente", () => {
    expect(() => conta.transferir(200, contaDestino)).toThrow("Saldo insuficiente");
  });

  test("Teste de Saldo Atual", () => {
    expect(conta.obterSaldo()).toBe(100);
  });

  test("Teste de Histórico", () => {
    conta.depositar(50);
    conta.sacar(30);
    expect(conta.obterHistorico()).toEqual([
      { tipo: "Depósito", valor: 50 },
      { tipo: "Saque", valor: 30 },
    ]);
  });

  test("Teste de Limite de Saque", () => {
    conta.definirLimiteDeSaque(100);
    expect(() => conta.verificarLimiteDeSaque(150)).toThrow("Saque acima do limite permitido");
    expect(conta.verificarLimiteDeSaque(50)).toBe(true);
  });

  test("Teste de Aplicação de Juros", () => {
    conta.aplicarJuros(10);
    expect(conta.obterSaldo()).toBe(110);
  });

  test("Teste de Pagamento de Conta", () => {
    conta.pagarConta(50, "Conta de luz");
    expect(conta.obterSaldo()).toBe(50);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Pagamento", valor: 50, descricao: "Conta de luz" });
  });

  test("Teste de Total Depositado", () => {
    conta.depositar(100);
    conta.depositar(50);
    expect(conta.obterTotalDepositado()).toBe(150);
  });
});
