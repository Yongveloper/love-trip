import { useCallback, useState } from 'react';

function useClipboard(timeout = 2000) {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = useCallback(
		async ({ text, onSuccess }: { text: string; onSuccess?: () => void }) => {
			if (!navigator.clipboard) {
				console.warn('클립보드 API가 지원되지 않습니다');
				return false;
			}

			try {
				await navigator.clipboard.writeText(text);
				setIsCopied(true);
				onSuccess?.();

				setTimeout(() => {
					setIsCopied(false);
				}, timeout);

				return true;
			} catch (error) {
				console.error('클립보드 복사 실패:', error);
				return false;
			}
		},
		[timeout],
	);

	return { isCopied, copyToClipboard };
}

export default useClipboard;
