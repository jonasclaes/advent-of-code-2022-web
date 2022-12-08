import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

enum Type {
	DIR = 1,
	FILE = 2
}

class File {
	name: string;
	size: number;
	parent?: File;
	type: Type;
	children: Array<File>;
	constructor(name: string, size: number, parent?: File, type: Type = Type.DIR) {
		this.name = name;
		this.size = size;
		this.parent = parent;
		this.type = type;
		this.children = Array<File>(0);
	}
	getName(): string {
		return this.name;
	}
	getParent(): File | undefined {
		return this.parent ?? undefined;
	}
	getChildren(): Array<File> {
		return this.children;
	}
	addChild(child: File): File {
		this.children.push(child);
		return this;
	}
	getSize(): number {
		return this.size;
	}
	isFile(): boolean {
		return this.type == Type.FILE;
	}
	isDir(): boolean {
		return this.type == Type.DIR;
	}
}

let totalSize = 0;
const maxFileSize = 100000;

function generateStructure(file: File, depth = 0) {
	let size = file.getSize();

	const fileChildren = file.getChildren();
	for (let childIndex = 0; childIndex < fileChildren.length; childIndex++) {
		const child = fileChildren[childIndex];

		size += generateStructure(child, depth + 1);
	}

	if (file.isDir()) {
		if (size <= maxFileSize) {
			totalSize += size;
		}
	}

	return size;
}

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('input');

		if (!input) return invalid(400, { error: { missing: true, input } });

		const inputData = input.toString().split('\r\n');

		let cur = new File('/', 0);
		const root = cur;

		for (const line of inputData) {
			if (line === '') continue;

			const match = line.split(' ');

			const arg1 = match[1];

			if (arg1 == 'ls') continue;
			else if (arg1 == 'cd') {
				const arg2 = match[2];
				if (arg2 == '..') {
					cur = cur.getParent() ?? cur;
				} else if (arg2 == '/') {
					cur = root;
				} else {
					const fileChildren = cur.getChildren();
					for (let childIndex = 0; childIndex < fileChildren.length; childIndex++) {
						const child = fileChildren[childIndex];
						if (child.name == arg2) {
							cur = child;
						}
					}
				}
			} else if (match[0] == 'dir') {
				cur.addChild(new File(match[1], 0, cur, Type.DIR));
			} else {
				cur.addChild(new File(match[1], parseInt(match[0]), cur, Type.FILE));
			}
		}

		generateStructure(root);

		const output = `The total size of the file directory is: ${totalSize}\r\n`;

		return {
			success: true,
			formData: {
				input
			},
			data: {
				output
			}
		};
	}
};
