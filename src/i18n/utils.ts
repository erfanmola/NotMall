export function getNestedValue(obj: any, path: string): string | undefined {
	return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function interpolate(
	template: string,
	vars?: Record<string, string | number>,
): string {
	if (!vars) return template;
	return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) =>
		String(vars[key] ?? ""),
	);
}
