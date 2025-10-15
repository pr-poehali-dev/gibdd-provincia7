import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления новостями ГИБДД
    Args: event с httpMethod, body, queryStringParameters
    Returns: HTTP response с новостями или результатом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'DATABASE_URL not configured'})
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            cur.execute('SELECT id, title, description, content, date, created_at FROM news ORDER BY created_at DESC')
            news = cur.fetchall()
            
            news_list = []
            for item in news:
                news_list.append({
                    'id': item['id'],
                    'title': item['title'],
                    'description': item['description'],
                    'content': item['content'],
                    'date': item['date'],
                    'created_at': str(item['created_at'])
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'news': news_list})
            }
        
        if method == 'POST':
            admin_token = event.get('headers', {}).get('X-Admin-Token') or event.get('headers', {}).get('x-admin-token')
            if admin_token != 'admin123':
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({'error': 'Unauthorized'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            title = body_data.get('title')
            description = body_data.get('description')
            content = body_data.get('content', '')
            date = body_data.get('date')
            
            if not title or not description or not date:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Missing required fields'})
                }
            
            cur.execute(
                'INSERT INTO news (title, description, content, date, author_id) VALUES (%s, %s, %s, %s, 1) RETURNING id',
                (title, description, content, date)
            )
            new_id = cur.fetchone()['id']
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({'id': new_id, 'message': 'News created successfully'})
            }
        
        if method == 'PUT':
            admin_token = event.get('headers', {}).get('X-Admin-Token') or event.get('headers', {}).get('x-admin-token')
            if admin_token != 'admin123':
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({'error': 'Unauthorized'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            news_id = body_data.get('id')
            title = body_data.get('title')
            description = body_data.get('description')
            content = body_data.get('content', '')
            date = body_data.get('date')
            
            if not news_id or not title or not description or not date:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Missing required fields'})
                }
            
            cur.execute(
                'UPDATE news SET title = %s, description = %s, content = %s, date = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s',
                (title, description, content, date, news_id)
            )
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'News updated successfully'})
            }
        
        if method == 'DELETE':
            admin_token = event.get('headers', {}).get('X-Admin-Token') or event.get('headers', {}).get('x-admin-token')
            if admin_token != 'admin123':
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({'error': 'Unauthorized'})
                }
            
            query_params = event.get('queryStringParameters', {})
            news_id = query_params.get('id')
            
            if not news_id:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Missing news ID'})
                }
            
            cur.execute('DELETE FROM news WHERE id = %s', (news_id,))
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'News deleted successfully'})
            }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
