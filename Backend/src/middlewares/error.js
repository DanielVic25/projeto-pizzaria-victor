module.exports = (err, req, res, next) => {
  console.error("\n ERRO DETECTADO ");
  console.error("Mensagem:", err.message);
  console.error("Nome do erro:", err.name);
  console.error("Código do erro:", err.code);
  console.error("Stack trace:", err.stack);

  // Erro de validação do Mongoose
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: 400,
      error: "Falha de validação dos dados",
      details: Object.values(err.errors).map(e => e.message),
      timestamp: new Date().toISOString()
    });
  }

  // Erro de valor de ID inválido (ex: ID mal formatado no MongoDB)
  if (err.name === "CastError") {
    return res.status(400).json({
      status: 400,
      error: "ID inválido ou formato incorreto",
      field: err.path,
      value: err.value,
      timestamp: new Date().toISOString()
    });
  }

  // Erro de índice único (duplicado)
  if (err.code === 11000) {
    return res.status(409).json({
      status: 409,
      error: "Registro duplicado",
      fields: err.keyValue,
      timestamp: new Date().toISOString()
    });
  }

  // Erros HTTP personalizados lançados manualmente
  if (err.status) {
    return res.status(err.status).json({
      status: err.status,
      error: err.message || "Erro personalizado",
      timestamp: new Date().toISOString()
    });
  }

  // Erro genérico (caso nada acima se aplique)
  res.status(500).json({
    status: 500,
    error: "Erro interno do servidor",
    details: err.message,
    timestamp: new Date().toISOString()
  });
};
