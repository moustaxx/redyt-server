let links = [{
	id: 'link-0',
	url: 'www.howtographql.com',
	description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length;

export default {
	Query: {
		info: () => 'This is the API of mine bieatch.',
			feed: () => links
	},

	Mutation: {
		post: (root: any, args: any) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			}
			links.push(link)
			return link
		},

		updateLink: ({ }, { id, description, url }: any) => {
			let link = links.find(x => x.id === id);
			if (!link) throw new Error('404 kszysio not found');
			link.description = description;
			link.url = url;
			return { id, description, url };
		},

		deleteLink: ({ }, { id }: any) => {
			links = links.filter(l => l.id !== id);
			return;
		},
	},

	Link: {
		id: (root: any) => root.id,
		description: (root: any) => root.description,
		url: (root: any) => root.url,
	}
};