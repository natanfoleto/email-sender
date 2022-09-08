import env from '@config/config';
import { createCluster, createClient } from 'redis';

interface IGetKey {
	key: string;
}

interface ISetKey {
	key: string;
	data: any;
	duration?: number | null;
}

interface IDelKey {
	key: string;
}

let KeyCache: any;

const startRedis = async () => {
	if (env.REDIS_USE_CLUSTER) {
		KeyCache = createCluster({ rootNodes: [{ url: env.REDIS_URL }] });
	} else {
		KeyCache = createClient({ url: env.REDIS_URL });
	}

	KeyCache.on('error', (err: any) => console.error('REDIS ERROR:', err));
	await KeyCache.connect();
};
startRedis();

const getCache = async ({ key }: IGetKey): Promise<any> => {
	let keyData;
	try {
		keyData = await KeyCache.get(key);
	} catch (error) {
		console.error(error);
		return undefined;
	}
	return keyData;
};

const setCache = async ({
	key,
	data,
	duration = null,
}: ISetKey): Promise<any> => {
	let setKey: any;
	if (duration) {
		setKey = await KeyCache.setEx(key, duration, data);

		return setKey;
	}

	setKey = await KeyCache.set(key, data);
	return setKey;
};

const delCache = async ({ key }: IDelKey): Promise<any> => {
	let setKey: any;

	setKey = await KeyCache.del(key);
	return setKey;
};

export { getCache, setCache, delCache };
