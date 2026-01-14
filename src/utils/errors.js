/**
 * Classe padronizada de erros da aplicação
 */
class AppError extends Error {
  constructor(mensagem, statusCode = 500) {
    super(mensagem);
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Erros comuns pré-definidos
 */
class ValidationError extends AppError {
  constructor(mensagem) {
    super(mensagem, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(mensagem = 'Não autorizado') {
    super(mensagem, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(mensagem = 'Acesso proibido') {
    super(mensagem, 403);
  }
}

class NotFoundError extends AppError {
  constructor(mensagem = 'Recurso não encontrado') {
    super(mensagem, 404);
  }
}

class ConflictError extends AppError {
  constructor(mensagem) {
    super(mensagem, 409);
  }
}

module.exports = {
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
