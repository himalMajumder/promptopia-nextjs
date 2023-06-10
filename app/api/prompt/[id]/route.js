import { connectToDb } from '@utils/database';
import Prompt from '@models/prompt';

// Get (RED)
export const GET = async (req, { params }) => {
	try {
		await connectToDb();

		const prompt = await Prompt.findById(params.id).populate('creator');
		if (!prompt) {
			return new Response('Prompt not found', { status: 500 });
		}
		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch prompt', { status: 500 });
	}
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json();
	try {
		await connectToDb();

		const existPrompt = await Prompt.findById(params.id);
		if (!existPrompt) {
			return new Response('Prompt not found', { status: 500 });
		}

		existPrompt.prompt = prompt;
		existPrompt.tag = tag;

		existPrompt.save();

		return new Response(JSON.stringify(existPrompt), { status: 200 });
	} catch (error) {
		return new Response('Failed to update prompt', { status: 500 });
	}
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
	try {
		await connectToDb();

		await Prompt.findByIdAndDelete(params.id);

		return new Response('Prompt Delete successfully', { status: 200 });
	} catch (error) {
		return new Response('Failed to delete prompt', { status: 500 });
	}
};
