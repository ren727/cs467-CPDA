import unittest
import API_Service.main as main


class TestCase(unittest.TestCase):

    def test1(self):
        expected = "Hello World"
        self.assertEqual(main.index(), expected)

    def test2(self):
        expected = "Goodbye World"
        self.assertNotEqual(main.index(), expected)


if __name__ == '__main__':
    unittest.main()
