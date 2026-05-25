export function clean(v) {
  return v ? v.trim() : "";
}

export function validateStudent(n, g, r) {
  n = clean(n);
  g = clean(g);
  r = clean(r);

  if (!n || !g || !r) return "Completa estudiante";
  if (n.length < 3) return "Nombre corto";

  return true;
}

export function validateRoute(n, c, t, d) {
  n = clean(n);
  c = clean(c);
  t = clean(t);
  d = clean(d);

  if (!n || !c || !t || !d) return "Completa ruta";

  return true;
}