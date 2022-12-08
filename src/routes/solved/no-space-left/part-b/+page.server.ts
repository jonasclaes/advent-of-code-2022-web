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
	simulatedSize: number;
	constructor(name: string, size: number, parent?: File, type: Type = Type.DIR) {
		this.name = name;
		this.size = size;
		this.parent = parent;
		this.type = type;
		this.children = Array<File>(0);
		this.simulatedSize = 0;
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
	setSimulatedSize(size: number): void {
		this.simulatedSize = size;
	}
	getSimulatedSize(): number {
		return this.simulatedSize;
	}
}

function generateStructure(file: File, depth = 0) {
	let size = file.getSize();

	const fileChildren = file.getChildren();
	for (let childIndex = 0; childIndex < fileChildren.length; childIndex++) {
		const child = fileChildren[childIndex];

		size += generateStructure(child, depth + 1);
	}

	if (file.isDir()) {
		file.setSimulatedSize(size);
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

		const totalSpace = 70000000;
		const unusedReq = 30000000;

		generateStructure(root);

		const rootActualSize = root.getSimulatedSize();
		const sizeFree = totalSpace - rootActualSize;
		const spaceToFree = Math.max(unusedReq - sizeFree);

		let smallestFile = root;

		function getSmallestDir(dir: File, depth = 0) {
			if (dir.isFile()) return;

			const dirChildren = dir.getChildren();
			for (let childIndex = 0; childIndex < dirChildren.length; childIndex++) {
				const child = dirChildren[childIndex];
				getSmallestDir(child, depth + 1);
			}

			const dirSize = dir.getSimulatedSize();

			if (dirSize > 0 && dirSize < smallestFile.getSimulatedSize() && dirSize >= spaceToFree) {
				smallestFile = dir;
			}
		}

		getSmallestDir(root);

		const output = `Root actual size: ${rootActualSize}\r\nSize required: ${sizeFree}\r\nSpace to free up: ${spaceToFree}\r\nSmallest direcotry freeing up space is "${
			smallestFile.name
		}" with size ${smallestFile.getSimulatedSize()}`;

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
