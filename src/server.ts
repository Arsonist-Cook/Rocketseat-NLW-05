import { http } from './http';
import './websocket/client'
import './websocket/admin'

const PORT = 3000;

http.listen(PORT, () => {
	console.log(`Server running on port #${PORT}`);
});
