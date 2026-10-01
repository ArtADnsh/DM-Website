function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ");
}

export function getMaterialCategory(material) {
  const cat = material.category ? String(material.category).toLowerCase() : "";

  if (cat === "assignment" || cat === "assignments" || cat === "homework") {
    return "assignments";
  }

  if (cat === "quiz" || cat === "quizzes") {
    return "quizzes";
  }

  if (
    cat === "sample_exam" ||
    cat === "sample-exams" ||
    cat === "exam" ||
    cat === "exams"
  ) {
    return "sample-exams";
  }

  if (
    cat === "lecture_note" ||
    cat === "lecture-notes" ||
    cat === "note" ||
    cat === "notes"
  ) {
    return "lecture-notes";
  }

  const searchableText = [
    material.category_display,
    material.categoryDisplay,
    material.title,
    material.description,
  ]
    .map(normalizeText)
    .filter(Boolean)
    .join(" ");

  if (/\b(exam|sample exam|past paper)s?\b/.test(searchableText)) {
    return "sample-exams";
  }

  if (/\bquiz(zes)?\b/.test(searchableText)) {
    return "quizzes";
  }

  if (
    /\b(assignment|homework|problem set|exercise|worksheet)s?\b/.test(
      searchableText,
    )
  ) {
    return "assignments";
  }

  return "lecture-notes";
}

export function normalizeMaterial(material, index) {
  return {
    ...material,
    id: material.id ?? `${getMaterialCategory(material)}-${index}`,
    number: material.number ?? String(index + 1).padStart(2, "0"),
    url: material.url ?? material.file_url ?? material.file ?? "#",
    type: material.type ?? material.file_type ?? "PDF",
    size: material.size ?? material.file_size ?? "",
  };
}
